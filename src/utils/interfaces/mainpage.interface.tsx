export interface MainPageProps {
  autoCompleteOptions: { value: string; label: any }[];
  onSelectCity: (value: any) => void;
  onSearchCity: (value: any) => void;
}
