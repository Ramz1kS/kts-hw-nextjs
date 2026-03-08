import React, { useState } from 'react';
import Input from '@components/Input';
import Button from '@components/Button';
import MultiDropdown from '@components/MultiDropdown';
import { Option, type CategoryData } from '@shared/types';
import classes from './SearchFilter.module.scss';
import { observer } from 'mobx-react-lite';
import CheckBox from '@components/CheckBox';
import Text from '@components/Text';
import { useProductListPageStore } from '@/hooks/useProductListPageStore';
import ProductListStore from '@/pageStores/ProductListStore/ProductListStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import OptionSelector from '@/components/OptionSelector/OptionSelector';

const SearchFilter: React.FC = observer(() => {
  const router = useRouter()
  const pathname = usePathname();
  const pageStore = useProductListPageStore()
  const titleFunc = (values: CategoryData[]) => {
    if (values.length === 0) return 'Filter';
    if (values.length === 1) return values[0].title;
    return `${values.length} categories selected`;
  };

  const setUrlParams = () => {
    const params = pageStore.getURLSearchParams()
    router.replace(`${pathname}?${params.toString()}/`);
  }

  const resetFilters = () => {
    router.replace(pathname)
  }

  return (
    <>
      <div className={classes['search-filter__input-wrapper']}>
        <Input
          value={pageStore.searchQuery}
          onChange={pageStore.setSearchQuery}
          className={classes['search-filter__input']}
          placeholder="Search product"
          afterSlot={
            <Button
              onClick={() => {
                setUrlParams()
              }}
              className={classes['search-filter__button']}
            >
              Find now
            </Button>
          }
        />
      </div>
      <div className={classes['search-filter__wrapper']}>
        <div className={classes['search-filter__dropdown-wrapper']}>
            <MultiDropdown
              options={pageStore.filtersCategory}
              value={pageStore.selectedFiltersCategory}
              onChange={pageStore.setSelectedCategories}
              getTitle={titleFunc}
            />
        </div>
        <div className={classes['search-filter__checkbox-wrapper']}>
          <Text view="p-20" weight="medium">
            Stock only:{' '}
          </Text>
          <CheckBox
            checked={pageStore.inStockOnly}
            onChange={pageStore.setInStockOnly}
          ></CheckBox>
        </div>
        <OptionSelector 
        name='Sort by'
        options={pageStore.sortBy} 
        selected={pageStore.selectedSortBy}
        setSelected={pageStore.setSortBy}></OptionSelector>
        <OptionSelector 
        name='Sort how'
        options={pageStore.sortHow} 
        selected={pageStore.selectedSortHow}
        setSelected={pageStore.setSortHow}></OptionSelector>
        <Button oneLined onClick={resetFilters}
        >Reset filters</Button>
      </div>
    </>
  );
});

export default SearchFilter;
