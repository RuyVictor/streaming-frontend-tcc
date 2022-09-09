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
import LoadingIndicator from "../../components/LoadingIndicator";
import Divider from "../../components/Divider";
import { IPagination } from "../../models/Common/Pagination";
import { ICategory } from "../../models/Category";
import { ISearchQuery } from "../../models/Common/SearchQuery";
import { CategoryService } from "../../services";
import { toast } from "react-toastify";
import { Nothing } from "../../components";

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const defaultCategory = "Jogos";

  const [selectedCategory, setSelectedCategory] = useState(
    // caso acesse diretamente via URL
    searchParams.get("tag") ??
      // fallback para caso acesse a apartir de outra página
      defaultCategory
  );

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    tagParam
      ? setSelectedCategory(tagParam)
      : navigate(`?tag=${defaultCategory}`); // categoria padrão
  }, [location.search]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryOptions, setQueryOptions] = useState<ISearchQuery>({
    page: 1,
    take: 9,
  });
  const [categories, setCategories] = useState<ICategory[]>();
  const [subCategories, setSubCategories] = useState<IPagination<ICategory[]>>({
    data: [],
    total: 0,
  });

  useEffect(() => {
    const handleGetCategoriesAndSubCategories = async () => {
      try {
        setIsLoading(true);
        const [rootCategoriesResponse, subCategoriesResponse] =
          await Promise.all([
            CategoryService.getRootCategories(),
            CategoryService.getSubcategories({
              name: selectedCategory,
              page: queryOptions.page,
              take: queryOptions.take,
            }),
          ]);
        setCategories(rootCategoriesResponse.data);
        setSubCategories(subCategoriesResponse.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Ocorreu um problema ao requisitar dados do servidor!");
      }
    };
    handleGetCategoriesAndSubCategories();
  }, [queryOptions, selectedCategory]);

  const primaryCategoryList = useMemo(
    () =>
      categories?.map((category) => {
        return (
          <PrimaryCategoryCardContainer
            key={category.id}
            categoriesLength={categories.length}
            selected={selectedCategory === category.name}
            onClick={() => {
              if (JSON.parse(category.have_subcategories!)) {
                navigate(`?tag=${category.name}`);
              } else {
                navigate(category.name);
              }
            }}
          >
            <ImageCard loading="eager" src={category.image} />
            <CategoryInfoContainer>
              <CardTitle>{category.name}</CardTitle>
              <HorizontalContainer>
                <MdLiveTv size={20} />
                {category.number_of_streams}
              </HorizontalContainer>
            </CategoryInfoContainer>
          </PrimaryCategoryCardContainer>
        );
      }),
    [categories, selectedCategory]
  );

  return (
    <Container>
      {!isLoading ? (
        categories?.length !== 0 ? (
          <>
            <SubTitle>Principais Categorias</SubTitle>
            <Divider />
            <PrimaryCategoriesContainer>
              {primaryCategoryList}
            </PrimaryCategoriesContainer>
            <SubTitle>Subcategorias</SubTitle>
            <Divider />
            <GridContainer>
              {subCategories.data?.map((subCategory) => (
                <SubCategoriesCardContainer
                  key={subCategory.id}
                  onClick={() => navigate(subCategory.name)}
                >
                  <ImageCard loading="lazy" src={subCategory.image} />
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
          </>
        ) : (
          <Nothing>Há um grande vazio por aqui...</Nothing>
        )
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default Categories;
