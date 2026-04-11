import dynamic from "next/dynamic";

const SwitchThemeClient = dynamic(() => import("./SwitchThemeClient"), {
  ssr: false,
  loading: () => (
    <div
      className="h-10 w-10"
      aria-hidden="true"
    />
  ),
});

export default function SwitchTheme() {
  return <SwitchThemeClient />;
}
