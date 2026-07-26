from __future__ import annotations

import subprocess
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PHOTO_SOURCE = ROOT / "assets" / "generated" / "world-photo"
PHOTO_MASTER = ROOT / "assets" / "processed" / "world-photo-4k"
PUBLIC_MEDIA = ROOT / "public" / "media" / "world-rich"
FFMPEG = ROOT / "node_modules" / "ffmpeg-static" / "ffmpeg.exe"

PHOTO_JOBS = {
    "world-orbit-photo-master.png": "world-orbit",
    "population-city-photo-master.png": "population-city",
    "food-water-photo-master.png": "food-water",
    "energy-photo-master.png": "energy-grid",
    "health-photo-master.png": "health-human",
    "sources-photo-master.png": "sources-archive",
    "studio-photo-master.png": "studio-method",
}

VIDEO_JOBS = (
    {
        "source": "earth-orbit-pexels-30683870.mp4",
        "output": "world-orbit.mp4",
        "start": "0",
        "duration": "7",
        "filter": "scale=1280:720:flags=lanczos",
    },
    {
        "source": "city-night-pexels-31404084.mp4",
        "output": "population-city.mp4",
        "start": "8",
        "duration": "7",
        "filter": (
            "crop=iw:iw*9/16:0:(ih-iw*9/16)/2,"
            "scale=1280:720:flags=lanczos"
        ),
    },
    {
        "source": "agriculture-water-pexels-9985873.mp4",
        "output": "food-water.mp4",
        "start": "4",
        "duration": "8",
        "filter": "scale=1280:720:flags=lanczos",
    },
    {
        "source": "energy-pexels-32939598.mp4",
        "output": "energy-grid.mp4",
        "start": "3",
        "duration": "8",
        "filter": "scale=1280:720:flags=lanczos",
    },
    {
        "source": "health-clinic-pexels-35923202.mp4",
        "output": "health-human.mp4",
        "start": "2",
        "duration": "8",
        "filter": "scale=1280:720:flags=lanczos",
    },
)

FLOW_VIDEO_JOBS = (
    {
        "source": "world-orbit-flow-20260726.mp4",
        "output": "world-orbit-flow.mp4",
    },
)


def process_photos() -> None:
    PHOTO_MASTER.mkdir(parents=True, exist_ok=True)
    PUBLIC_MEDIA.mkdir(parents=True, exist_ok=True)

    for source_name, slug in PHOTO_JOBS.items():
        source_path = PHOTO_SOURCE / source_name
        if not source_path.exists():
            raise FileNotFoundError(source_path)

        with Image.open(source_path) as image:
            image = image.convert("RGB")

            master = ImageOps.fit(
                image,
                (3840, 2160),
                method=Image.Resampling.LANCZOS,
                centering=(0.5, 0.5),
            )
            master.save(
                PHOTO_MASTER / f"{slug}-master-4k.jpg",
                format="JPEG",
                quality=94,
                subsampling=0,
                optimize=True,
                progressive=True,
            )

            delivery = master.resize((1600, 900), Image.Resampling.LANCZOS)
            delivery.save(
                PUBLIC_MEDIA / f"{slug}-poster.webp",
                format="WEBP",
                quality=84,
                method=6,
            )


def process_videos() -> None:
    if not FFMPEG.exists():
        raise FileNotFoundError(
            f"ffmpeg-static binary not found at {FFMPEG}. Run npm install first."
        )

    source_root = ROOT / "assets" / "source-video"
    for job in VIDEO_JOBS:
        source_path = source_root / job["source"]
        output_path = PUBLIC_MEDIA / job["output"]
        if not source_path.exists():
            raise FileNotFoundError(source_path)

        command = [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-ss",
            job["start"],
            "-i",
            str(source_path),
            "-t",
            job["duration"],
            "-vf",
            f"{job['filter']},fps=24",
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "slow",
            "-crf",
            "27",
            "-profile:v",
            "high",
            "-level",
            "4.0",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(output_path),
        ]
        subprocess.run(command, check=True)

    # Flow already delivers a 1280×720, 24 fps H.264 master. Remuxing keeps the
    # generated pixels intact while stripping unused audio and adding fast-start
    # metadata for the browser.
    for job in FLOW_VIDEO_JOBS:
        source_path = source_root / job["source"]
        output_path = PUBLIC_MEDIA / job["output"]
        if not source_path.exists():
            raise FileNotFoundError(source_path)

        command = [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(source_path),
            "-map",
            "0:v:0",
            "-an",
            "-c:v",
            "copy",
            "-movflags",
            "+faststart",
            str(output_path),
        ]
        subprocess.run(command, check=True)


def main() -> None:
    process_photos()
    process_videos()

    for path in sorted(PUBLIC_MEDIA.iterdir()):
        print(f"{path.relative_to(ROOT)}\t{path.stat().st_size}")


if __name__ == "__main__":
    main()
