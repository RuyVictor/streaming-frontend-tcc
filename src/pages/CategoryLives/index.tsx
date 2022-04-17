import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPeopleFill } from "react-icons/bs";
import {
  Container,
  ImageCard,
  CardTitle,
  GridContainer,
  CardContainer,
  CardInfoContainer,
  CardDescription,
  CategoryThumbnailContainer,
  CategoryThumbnailTitle,
  CategoryThumbnailImage,
  CategoryThumbnailSubTitle,
  CategoryThumbnailInfoContainer,
  HorizontalContainer,
} from "./styles";
import LoadingIndicator from "../../components/LoadingIndicator";
import Divider from "../../components/Divider";
import { useStream } from "../../hooks/stream.hook";
import { ICategory } from "../../models/Category";
import { toast } from "react-toastify";
import { CategoryService } from "../../services";
import { AxiosError } from "axios";

const CategoryLives = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { handleGetStreams, queryOptions, isLoading, streams } = useStream();

  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  useEffect(() => {
    async function fetchData() {
      if (params.categoryName) {
        try {
          const response = await CategoryService.getOneCategory(
            params.categoryName
          );
          setSelectedCategory(response.data);
        } catch (error) {
          const err = error as AxiosError;
          navigate("/categories");
          if (err.response?.status === 404) {
            return toast.error("Categoria não encontrada!");
          }
          toast.error("Ocorreu um problema ao requisitar dados do servidor!");
        }
      } else {
        navigate(-1);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    handleGetStreams({
      search_filter: queryOptions.search_filter,
      category: selectedCategory?.name,
      page: queryOptions.page,
      take: queryOptions.take,
    });
  }, [selectedCategory]);

  const streamsList = useMemo(
    () =>
      streams?.map((stream) => {
        return (
          <CardContainer
            key={stream.id}
            onClick={() => {
              navigate(`/lives/${stream.user.name}`);
            }}
          >
            <ImageCard loading="eager" src={"https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4bf14109185029.5fce5f81c4b8f.jpg"} />
            <CardInfoContainer>
              <HorizontalContainer>
                <CardTitle>{stream.title}</CardTitle>
                <CardDescription>{stream.description}</CardDescription>
              </HorizontalContainer>
              <HorizontalContainer>
                <BsPeopleFill size={20}/>
                {stream.spectators}
              </HorizontalContainer>
            </CardInfoContainer>
          </CardContainer>
        );
      }),
    [streams]
  );

  return (
    <Container>
      <CategoryThumbnailContainer>
        <CategoryThumbnailImage src={selectedCategory?.image} />
        <CategoryThumbnailInfoContainer>
          <CategoryThumbnailTitle>
            {selectedCategory?.name}
          </CategoryThumbnailTitle>
          <CategoryThumbnailSubTitle>
            Espectadores: {selectedCategory?.number_of_streams}
          </CategoryThumbnailSubTitle>
        </CategoryThumbnailInfoContainer>
      </CategoryThumbnailContainer>
      <Divider />
      {!isLoading ? (
        <GridContainer>{streamsList}</GridContainer>
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default CategoryLives;
