import Link from 'next/link'
import classes from './ProductPage.module.scss';
import Text from '@components/Text';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon';
import BackButton from './components/BackButton/BackButton';

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={classes['product-page']}>
            <BackButton></BackButton>
            {children}
        </div>
    )
}