import { View } from "react-native";
import { Input } from "./Input";
import { Button } from "./Button";
import { Controller, useForm } from "react-hook-form";

interface SearchFormProps {
  onSubmit: (formValues: SearchFormValues) => void;
}

interface SearchFormValues {
  repositoryOwner: string;
  repositoryName: string;
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const { control, handleSubmit } = useForm<SearchFormValues>({
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
            label="Repository owner"
            onChange={field.onChange}
            value={field.value}
          />
        )}
        name="repositoryOwner"
      />
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            label="Repository name"
            onChange={field.onChange}
            value={field.value}
          />
        )}
        name="repositoryName"
      />
      <Button
        label="Search"
        onPress={handleSubmit((formData) => onSubmit(formData))}
      />
    </View>
  );
}
