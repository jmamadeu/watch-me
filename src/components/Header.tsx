type CategoryType = {
  categoryTitle: string;
};

export function Header({ categoryTitle }: CategoryType) {
  return (
    <header>
      <span className="category">
        Categoria:<span> {categoryTitle}</span>
      </span>
    </header>
  );
}
