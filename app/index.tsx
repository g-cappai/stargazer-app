import { SearchForm } from "@/components/SearchForm";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <SearchForm onSubmit={(formValues) => console.log(formValues)} />
      </View>
    </TouchableWithoutFeedback>
  );
}
