import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import type { Database } from "../../types/supabaseTypes";

type cabinType = Database["public"]["Tables"]["cabins"]["Row"];

interface CreateCabinFormProps {
  cabinToEdit?: cabinType; 
}

interface FormData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

function CreateCabinForm({ cabinToEdit }: CreateCabinFormProps) {
  const {id: editId, ...editValue} = cabinToEdit ?? {};

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({defaultValues: isEditSession ? editValue : {}});

  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("New cabin successfully created!");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: FormData) {
    const imageFile = data.image?.[0];

    mutate({...data, image: imageFile });
  }

  //   function onError(errors) {
  //     console.log(errors);
  //   }

  return (
    <Form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <FormRow label="Cabin name" id="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        id="maxCapacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        id="regularPrice"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 50, message: "Price must be at least 50" },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Discount" id="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            min: { value: 0, message: "Discount cannot be negative" },
            validate: (value) => {
              return (
                value < getValues().regularPrice ||
                "Discount should be less than the regular price."
              );
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        id="description"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo" id="image">
        <FileInput id="image" accept="image/*" {...register("image", {
            required: isEditSession ? false : "Image is required",
          })} disabled={isCreating} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditSession ? "Edit cabin" : "Create new Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
