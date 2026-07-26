type ViteImportMeta = ImportMeta & {
  readonly env: {
    readonly BASE_URL?: string;
  };
};

const baseUrl = (import.meta as ViteImportMeta).env.BASE_URL ?? "/";
const basePath = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");

export function sitePath(pathname: string) {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return pathname;
  }

  return pathname === "/" ? `${basePath}/` : `${basePath}${pathname}`;
}
