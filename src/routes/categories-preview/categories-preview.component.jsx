// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from 'react-redux';
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
      <>
        {
          isLoading
          ? <Spinner />
          : ( 
            Object.keys(categoriesMap).map((title) => {
              const products = categoriesMap[title];
              return <CategoryPreview key={title} title={title} products={products} />;
            })
        )}
      </>
  );
}

export default CategoriesPreview;