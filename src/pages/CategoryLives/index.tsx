import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  GridContainer,
  CategoryThumbnailContainer,
  CategoryThumbnailTitle,
  CategoryThumbnailImage,
  CategoryThumbnailSubTitle,
  CategoryThumbnailInfoContainer,
} from "./styles";
import LoadingIndicator from "../../components/LoadingIndicator";
import Divider from "../../components/Divider";
import { useStream } from "../../hooks/stream.hook";
import { ICategory } from "../../models/Category";
import { toast } from "react-toastify";
import { CategoryService } from "../../services";
import { AxiosError } from "axios";
import StreamCard from "../../components/StreamCard";

const CategoryLives = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { handleGetStreams, queryOptions, isLoading, streams } = useStream();

  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CategoryService.getOneCategory(
          params.categoryName!
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
    }
    fetchData();
  }, []);

  useEffect(() => {
    handleGetStreams({
      title: queryOptions.title,
      category: selectedCategory?.name,
      page: queryOptions.page,
      take: queryOptions.take,
    });
  }, [selectedCategory]);

  const streamsList = useMemo(
    () =>
      streams?.map((stream) => <StreamCard key={stream.id} stream={stream}/>),
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
