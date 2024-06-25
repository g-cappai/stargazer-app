import { Keyboard, StyleSheet, View } from "react-native";
import { Input } from "../shared";
import { Button } from "../shared";
import { Controller, useForm } from "react-hook-form";
import { Spacing } from "@/constants/Spacing";
import { Colors } from "@/constants/Colors";

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

  /**
   * Strip whitespace from the input value.
   * @param {string} value - The input value.
   * @returns {string} - The input value without leading or trailing whitespace.
   */
  const trimInput = (value: string): string => value.trim();

  /**
   * NOTE: Validation is superfluous in this form.
   * Disabling the submit button in case the values are empty may be an alternative.
   */
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            placeholder="facebook"
            label={SearchFormLabels.repositoryOwner}
            onChange={(v) => field.onChange(trimInput(v))}
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
            onChange={(v) => field.onChange(trimInput(v))}
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
    paddingHorizontal: Spacing.m,
    paddingBottom: Spacing.l,
    backgroundColor: Colors.bgDefault,
  },
});
