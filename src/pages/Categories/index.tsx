import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { MdLiveTv } from "react-icons/md";
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
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const {
    handleGetCategories,
    handleGetSubCategories,
    isLoading,
    queryOptions,
    categories,
    subCategories,
  } = useCategory();

  const defaultCategory = 'Jogos';

  const [selectedCategory, setSelectedCategory] = useState(
    // caso acesse diretamente via URL
    searchParams.get('tag') ??
    // fallback para caso acesse a apartir de outra página
    defaultCategory
  );

  useEffect(() => {
    const tagParam = searchParams.get('tag');
    tagParam ? setSelectedCategory(tagParam) : navigate(`?tag=${defaultCategory}`) // categoria padrão
  }, [location.search]);

  useEffect(() => {
    handleGetCategories({
      page: queryOptions.page,
      take: queryOptions.take,
    });
  }, []);

  useEffect(() => {
    handleGetSubCategories({
      name: selectedCategory,
      page: queryOptions.page,
      take: queryOptions.take,
    });
  }, [selectedCategory]);

  const primaryCategoryList = useMemo(
    () =>
      categories?.map((category) => {
        return (
          <PrimaryCategoryCardContainer
            key={category.id}
            categoriesLength={categories.length}
            selected={selectedCategory === category.name}
            onClick={() => {
              navigate(`?tag=${category.name}`);
            }}
          >
            <ImageCard loading="eager" src={category.image} />
            <CategoryInfoContainer>
              <CardTitle>{category.name}</CardTitle>
            </CategoryInfoContainer>
          </PrimaryCategoryCardContainer>
        );
      }),
    [categories, selectedCategory]
  );

  return (
    <Container>
      <SubTitle>Principais Categorias</SubTitle>
      <Divider />
      <PrimaryCategoriesContainer>
        {primaryCategoryList}
      </PrimaryCategoriesContainer>
      <SubTitle>Subcategorias</SubTitle>
      <Divider />
      {!isLoading ? (
        <GridContainer>
          {subCategories?.map((subCategory) => (
            <SubCategoriesCardContainer key={subCategory.id} onClick={() => navigate(subCategory.name)}>
              <ImageCard
                loading="eager"
                src={subCategory.image}
              />
              <SubCategoryInfoContainer>
                <CardTitle>{subCategory.name}</CardTitle>
                <HorizontalContainer>
                  <MdLiveTv size={20} />
                  {subCategory.number_of_streams}
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
