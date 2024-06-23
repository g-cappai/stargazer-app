import { Keyboard, StyleSheet, View } from "react-native";
import { Input } from "../shared";
import { Button } from "../shared";
import { Controller, useForm } from "react-hook-form";
import { Spacing } from "@/constants/Spacing";

interface SearchFormProps {
  onSubmit: (formValues: SearchFormValues) => void;
}

interface SearchFormValues {
  repositoryOwner: string;
  repositoryName: string;
}

export const SearchFormLabels = {
  repositoryOwner: "Owner",
  repositoryName: "Repository",
  search: "Search",
};

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
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            placeholder="facebook"
            label={SearchFormLabels.repositoryOwner}
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
            label={SearchFormLabels.repositoryName}
            onChange={field.onChange}
            value={field.value}
            error={!!errors.repositoryName}
          />
        )}
        name="repositoryName"
        rules={{ required: true }}
      />
      <Button
        label={SearchFormLabels.search}
        onPress={handleSubmit((formData) => {
          Keyboard.dismiss();
          onSubmit(formData);
        })}
        title="Search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.l,
    marginHorizontal: Spacing.m,
  },
});
