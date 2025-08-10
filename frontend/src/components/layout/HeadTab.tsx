import * as React from "react";

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export function Tabs({ value, onValueChange, children }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    onValueChange(val);
  };

  // TabsList, TabsTrigger, TabsContentはchildrenとして受け取る
  // Contextでvalueを渡す
  return (
    <TabsContext.Provider value={{ value: internalValue, onValueChange: handleChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsListProps = {
  children: React.ReactNode;
  className?: string;
};
export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={`flex border-b border-border ${className || ""}`}>{children}</div>
  );
}

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};
export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx.value === value;
  return (
    <button
      type="button"
      className={`px-3 py-2 border-b-2 transition font-medium ${
        isActive
          ? "border-primary text-primary bg-primary/10"
          : "border-transparent text-muted-foreground hover:bg-muted/50"
      } ${className || ""}`}
      onClick={() => ctx.onValueChange(value)}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};
export function TabsContent({ value, children, className }: TabsContentProps) {
  const ctx = React.useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}

// Context
type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};
const TabsContext = React.createContext<TabsContextType>({
  value: "",
  onValueChange: () => {},
});
