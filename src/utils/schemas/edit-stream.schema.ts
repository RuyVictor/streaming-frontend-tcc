import * as Yup from "yup";

import { IEditStreamDTO } from "../../models/Stream";

export const EditStreamSchema: Yup.SchemaOf<IEditStreamDTO> =
  Yup.object().shape({
    title: Yup.string().required("Digite um título"),
    description: Yup.string().nullable().notRequired(),
    categoryId: Yup.string().required("Digite uma categoria"),
  });
