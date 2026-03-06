import Link from 'next/link'
import classes from './ProductPage.module.scss';
import Text from '@components/Text';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon';

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={classes['product-page']}>
        <Link href={'../'} className={classes['product-page__back-link']}>
            <ArrowLeftIcon width={32} height={32} color="primary" />
            <Text view="p-20" weight="normal">
            Back
            </Text>
        </Link>
            {children}
        </div>
    )
}