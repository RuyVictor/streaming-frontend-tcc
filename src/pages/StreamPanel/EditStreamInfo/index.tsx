import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Description, InputsContainer } from "./styles";
import { IEditStreamDTO, IStream } from "../../../models/Stream";
import { CategoryService, StreamService } from "../../../services";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Button, Input, Select } from "../../../components";
import { EditStreamSchema } from "../../../utils/schemas/edit-stream.schema";
import { useAuth } from "../../../hooks/auth.hook";
import { ICategory } from "../../../models/Category";

const EditStreamInfo: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stream, setStream] = useState<IStream>();
  const [categories, setCategories] = useState<ICategory[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [streamResponse, categoriesResponse] = await Promise.all([
          await StreamService.getOneStream(user?.name!),
          await CategoryService.getSelectableCategories(),
        ]);
        setStream(streamResponse.data);
        setCategories(categoriesResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        navigate(-1);
        toast.error("Ocorreu um problema ao requisitar dados do servidor!");
      }
    }
    fetchData();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<IEditStreamDTO>({
    resolver: yupResolver(EditStreamSchema),
  });

  useEffect(() => {
    if (stream) {
      reset({
        title: stream.title,
        description: stream.description,
        category: stream.category?.id,
      });
    }
  }, [stream]);

  const onSubmit = async (data: IEditStreamDTO) => {
    try {
      setIsEditing(true);
      await StreamService.editStream(data);
      toast.success("Editado com sucesso!");
      navigate("?option=Painel");
    } catch (err) {
      setIsEditing(false);
      toast.error("Erro ao editar a stream!");
    }
  };

  return (
    <Container>
      {!isLoading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputsContainer>
            <Alert>Para começar a fazer transmissão, é necessário pelo menos um título e a categoria</Alert>
            <Input
              label="Título"
              {...register("title")}
              error={formState.errors.title?.message}
            />
            <Input
              label="Descrição"
              {...register("description")}
              error={formState.errors.description?.message}
            />

            <Select
              label="Categoria"
              style={{width: 200}}
              options={categories?.map((value) => ({
                id: value.id,
                label: value.name,
              }))}
              {...register("category")}
              error={formState.errors.category?.message}
            />

            <Button
              variant="secondary"
              disabled={isEditing}
              type="submit"
              expanded
            >
              Editar
            </Button>
          </InputsContainer>
        </form>
      ) : null}
    </Container>
  );
};

export default EditStreamInfo;
