import { Keyboard, StyleSheet, View } from "react-native";
import { Input } from "../shared";
import { Button } from "../shared";
import { Controller, useForm } from "react-hook-form";
import { Spacing } from "@/theme/Spacing";
import { Colors } from "@/theme/Colors";

interface SearchFormProps {
  onSubmit: (formValues: SearchFormValues) => void;
  isSubmitting?: boolean;
}

interface SearchFormValues {
  owner: string;
  repo: string;
}

export const SearchFormLabels = {
  owner: "Owner",
  repo: "Repository",
  search: "Search",
};

export function SearchForm({ onSubmit, isSubmitting }: SearchFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    defaultValues: {
      owner: "",
      repo: "",
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
            label={SearchFormLabels.owner}
            onChange={(v) => field.onChange(trimInput(v))}
            value={field.value}
            error={!!errors.owner}
          />
        )}
        name="owner"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field }) => (
          <Input
            placeholder="react"
            label={SearchFormLabels.repo}
            onChange={(v) => field.onChange(trimInput(v))}
            value={field.value}
            error={!!errors.repo}
          />
        )}
        name="repo"
        rules={{ required: true }}
      />
      <Button
        label={SearchFormLabels.search}
        disabled={isSubmitting}
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
