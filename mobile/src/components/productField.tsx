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
    <View className="flex-col gap-2 w-11/12 mx-auto">
      <Text className="font-bold text-lg">{label}</Text>
      <TextInput
        value={String(value)}
        onChangeText={onChange}
        editable={editable}
        keyboardType={keyboardType}
        className="border border-slate-50 bg-slate-50 rounded-full px-4 py-2 text-lg"
      />
    </View>
  );
};
