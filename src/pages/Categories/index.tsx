import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BsPeopleFill } from "react-icons/bs";
import {
  Container,
  ImageCard,
  SubCategoriesCardContainer,
  CardTitle,
  SubCategoryInfoContainer,
  HorizontalContainer,
  PrimaryCategoriesContainer,
  GridContainer,
  PrimaryCategoryCardContainer,
  CategoryInfoContainer,
  SubTitle,
} from "./styles";
import { useCategory } from "../../hooks/category.hook";
import LoadingIndicator from "../../components/LoadingIndicator";
import Divider from "../../components/Divider";

const Categories = () => {
  const navigate = useNavigate();
  const {
    handleGetCategories,
    handleGetSubCategories,
    setQueryOptions,
    isLoading,
    queryOptions,
    categories,
    subCategories,
  } = useCategory();

  useEffect(() => {
    handleGetCategories({
      search_filter: queryOptions.search_filter,
      page: queryOptions.page,
      take: queryOptions.take,
    });

    handleGetSubCategories({
      search_filter: queryOptions.search_filter,
      name: queryOptions.name ?? "Jogos",
      page: queryOptions.page,
      take: queryOptions.take,
    });
  }, []);

  useEffect(() => {
    handleGetSubCategories({
      search_filter: queryOptions.search_filter,
      name: queryOptions.name ?? "Jogos",
      page: queryOptions.page,
      take: queryOptions.take,
    });
  }, [queryOptions]);

  const primaryCategoryList = useMemo(
    () =>
      categories?.map((category, index) => {
        return (
          <PrimaryCategoryCardContainer
            tabIndex={index}
            categoriesLength={categories.length}
            onClick={() => {
              setQueryOptions((prevState) => ({
                ...prevState,
                name: category.name,
              }));
            }}
          >
            <ImageCard loading="eager" src={category.image} />
            <CategoryInfoContainer>
              <CardTitle>{category.name}</CardTitle>
            </CategoryInfoContainer>
          </PrimaryCategoryCardContainer>
        );
      }),
    [categories]
  );

  return (
    <Container>
      <SubTitle>Principais Categorias</SubTitle>
      <Divider/>
      <PrimaryCategoriesContainer>{primaryCategoryList}</PrimaryCategoriesContainer>
      <SubTitle>Subcategorias</SubTitle>
      <Divider/>
      {!isLoading ? (
        <GridContainer>
          {subCategories?.map((subCategory) => (
            <SubCategoriesCardContainer>
              <ImageCard
                loading="eager"
                src={subCategory.image}
                onClick={() => navigate(subCategory.name)}
              />
              <SubCategoryInfoContainer>
                <CardTitle>{subCategory.name}</CardTitle>
                <HorizontalContainer>
                  <BsPeopleFill size={20} />
                  {26}
                </HorizontalContainer>
              </SubCategoryInfoContainer>
            </SubCategoriesCardContainer>
          ))}
        </GridContainer>
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default Categories;
