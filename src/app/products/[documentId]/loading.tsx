import Text from "@components/Text";

const LoadingProduct = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Text view="title" color="accent" weight="medium">
          Loading... Please wait
        </Text>
      </div>
    </>
  );
};

export default LoadingProduct;
