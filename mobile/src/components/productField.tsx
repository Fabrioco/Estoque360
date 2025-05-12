import { Text, TextInput, View } from "react-native";

export type ProductFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  editable?: boolean;
  keyboardType?: "default" | "numeric";
};

export const ProductField = ({
  label,
  value,
  onChange,
  editable,
  keyboardType = "default",
}: ProductFieldProps) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        value={String(value)}
        onChangeText={onChange}
        editable={editable}
        keyboardType={keyboardType}
      />
    </View>
  );
};
