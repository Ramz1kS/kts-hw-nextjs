import classes from "./ProductPage.module.scss";
import BackButton from "./components/BackButton/BackButton";

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes["product-page"]}>
      <BackButton></BackButton>
      {children}
    </div>
  );
}
