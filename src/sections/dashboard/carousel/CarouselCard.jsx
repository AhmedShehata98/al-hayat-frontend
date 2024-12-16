import { DeleteForever } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import NextImage from "next/image";
import React from "react";
import { minioService } from "../../../api/minio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokens } from "../../../locales/tokens";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom";

function CarouselCard({ data }) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { token } = useRecoilValue(authAtom);

  const { mutateAsync: deleteCarouselAsync, isPending: isDeleting } =
    useMutation({
      mutationFn: ({ imageName }) =>
        minioService.deleteCarouselImage({ token, imageName }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["carousel"] });
        toast.success(t(tokens.carousel.messages.deleteSuccess), {
          duration: 3000,
        });
      },
    });

  const handleDeleteCarousel = async () => {
    await deleteCarouselAsync({ imageName: data.imageSrc.split("/").pop() });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        overflow: "hidden",
        transition:
          "background-color 0.3s ease, scale 0.3s ease,transform 0.3s ease",
        "&:after": {
          content: "''",
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: "10px",
          transition: "opacity 0.3s ease",
        },
        "&:hover": {
          scale: "1.03",
          transform: "translateY(-5px)",

          "&:after": {
            opacity: 0.3,
          },
        },

        width: "100%",
        maxWidth: 400,
        aspectRatio: 1.5,
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 5,
          top: 0,
          left: 0,
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        <IconButton
          sx={{ backgroundColor: "#F95454", color: "#FCFAEE" }}
          onClick={handleDeleteCarousel}
          disabled={isDeleting}
        >
          <DeleteForever />
        </IconButton>
      </Box>
      <NextImage
        sx={{
          objectFit: "cover",
          width: "100%",
          minWidth: "100%",
          height: "100%",
        }}
        src={data.imageSrc}
        width={400}
        height={350}
        alt="carousel-image"
      />
    </Box>
  );
}

export default CarouselCard;
