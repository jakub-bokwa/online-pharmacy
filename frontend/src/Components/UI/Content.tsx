type ContentProps = {
  children?: React.ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  return (
    <section className="max-w-360 mx-auto px-2 md:px-8 lg:px-12 mt-4 lg:mt-8 pb-12">
      {children}
    </section>
  );
};
