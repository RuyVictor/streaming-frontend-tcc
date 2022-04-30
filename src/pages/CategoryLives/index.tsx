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
import { ICategory } from "../../models/Category";
import { toast } from "react-toastify";
import { CategoryService, StreamService } from "../../services";
import { AxiosError } from "axios";
import StreamCard from "../../components/StreamCard";
import { Nothing } from "../../components";
import { IPagination } from "../../models/Common/Pagination";
import { IStream, IStreamSearch } from "../../models/Stream";

const CategoryLives = () => {
  const navigate = useNavigate();
  const params = useParams();


  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<ICategory>();
  const [streams, setStreams] = useState<IPagination<IStream[]>>({
    data: [],
    total: 0
  });
  const [queryOptions, setQueryOptions] = useState<IStreamSearch>({
    page: 1,
    take: 9
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [ categoryResponse, StreamsResponse ] = await Promise.all([
          await CategoryService.getOneCategory(
            params.categoryName!
          ),
          await StreamService.getStreams({
            category: params.categoryName!,
            page: queryOptions.page,
            take: queryOptions.take,
          })
        ])
        setCategory(categoryResponse.data);
        setStreams(StreamsResponse.data);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
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

  const streamsList = useMemo(
    () =>
      streams?.data?.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      )),
    [streams]
  );

  return (
    <Container>
      {!isLoading ? (
        <>
          <CategoryThumbnailContainer>
            <CategoryThumbnailImage src={category?.image} />
            <CategoryThumbnailInfoContainer>
              <CategoryThumbnailTitle>
                {category?.name}
              </CategoryThumbnailTitle>
              <CategoryThumbnailSubTitle>
                Streams ativas: {category?.number_of_streams}
              </CategoryThumbnailSubTitle>
            </CategoryThumbnailInfoContainer>
          </CategoryThumbnailContainer>
          <Divider />
          <GridContainer>{streamsList}</GridContainer>
          {streams?.data?.length === 0 && (
            <Nothing>Há um grande vazio por aqui...</Nothing>
          )}
        </>
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default CategoryLives;
