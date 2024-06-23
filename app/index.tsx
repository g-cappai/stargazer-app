import { SearchForm } from "@/components/SearchForm";

export default function Index() {
  return <SearchForm onSubmit={(formValues) => console.log(formValues)} />;
}
