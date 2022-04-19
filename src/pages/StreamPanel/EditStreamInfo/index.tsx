import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, InputsContainer } from "./styles";
import { IEditStreamDTO, IStream } from "../../../models/Stream";
import { CategoryService, StreamService } from "../../../services";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../../../components";
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

  const { register, handleSubmit, formState } = useForm<IEditStreamDTO>({
    resolver: yupResolver(EditStreamSchema),
  });

  const onSubmit = async (data: IEditStreamDTO) => {
    try {
      setIsEditing(true);
      await StreamService.editStream(data);
      toast.success("Editado com sucesso!");
      navigate("-1");
    } catch (err) {
      setIsEditing(false);
      toast.error("Erro ao editar a stream!");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          {/* <Title>Registrar</Title> */}
          <Input
            label="Título"
            defaultValue={stream?.title}
            {...register("title")}
            error={formState.errors.title?.message}
          />
          <Input
            label="Descrição"
            defaultValue={stream?.description}
            {...register("description")}
            error={formState.errors.description?.message}
          />

          <Select
            label="Categoria"
            defaultValue={stream?.category?.id}
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
    </Container>
  );
};

export default EditStreamInfo;
