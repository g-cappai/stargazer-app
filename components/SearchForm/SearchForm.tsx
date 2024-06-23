import { View } from "react-native";
import { Input } from "../shared";
import { Button } from "../shared";
import { Controller, useForm } from "react-hook-form";

interface SearchFormProps {
  onSubmit: (formValues: SearchFormValues) => void;
}

interface SearchFormValues {
  repositoryOwner: string;
  repositoryName: string;
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    defaultValues: {
      repositoryOwner: "",
      repositoryName: "",
    },
  });

  return (
    <View>
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            placeholder="facebook"
            label="Owner"
            onChange={field.onChange}
            value={field.value}
            error={!!errors.repositoryOwner}
          />
        )}
        name="repositoryOwner"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            placeholder="react"
            label="Repository"
            onChange={field.onChange}
            value={field.value}
            error={!!errors.repositoryName}
          />
        )}
        name="repositoryName"
        rules={{ required: true }}
      />
      <Button
        label="Search"
        onPress={handleSubmit((formData) => onSubmit(formData))}
        title="Search"
      />
    </View>
  );
}
