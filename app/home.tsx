import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Trailer from "@/components/trailer";
import { SafeAreaView } from "react-native-safe-area-context";

type TrailerType = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  yt_id: string;
  views: number;
  published: string;
  genres: string[];
};

type KinoCheckResponse = {
  [key: string]: any;
  _metadata?: {
    limit: number;
    page: number;
    total_pages: number;
    total_count: number;
  };
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const fetchTrailers = async (
    page: number,
    limit: number,
  ): Promise<KinoCheckResponse> => {
    const { data } = await axios.get<KinoCheckResponse>(
      `https://api.kinocheck.com/trailers/latest?page=${page}&limit=${limit}`,
    );
    return data;
  };

  const { data, isLoading, isError } = useQuery<KinoCheckResponse>({
    queryKey: ["trailers", page],
    queryFn: () => fetchTrailers(page, limit),
  });

  const trailers: TrailerType[] = data
    ? (Object.values(data)
      .filter((item: any) => item && item.id && item.title)
      .map((item: any) => ({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        url: item.url,
        yt_id: item.youtube_video_id,
        views: item.views,
        published: item.published,
        genres: item.genres || [],
      })) as TrailerType[])
    : [];

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
    >
      <SafeAreaView
        style={styles.container}
        edges={["top", "left", "right", "bottom"]}
      >
        <Text style={styles.header}>Трейлеры</Text>

        {isLoading && <ActivityIndicator size="large" color="#ccc" />}
        {isError && (
          <Text style={styles.errorText}>Ошибка при загрузке данных</Text>
        )}

        {!isLoading && !isError && (
          <>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              onScroll={({ nativeEvent }) => {
                const { contentOffset, contentSize, layoutMeasurement } =
                  nativeEvent;
                if (contentOffset.y <= 0) {
                  console.log("достигнут верх");
                }
                if (
                  contentOffset.y + layoutMeasurement.height >=
                  contentSize.height - 20
                ) {
                  console.log("достигнут низ");
                }
              }}
              scrollEventThrottle={16}
            >
              {trailers.map((trailer) => (
                <Trailer
                  key={trailer.id}
                  id={trailer.id}
                  title={trailer.title}
                  thumbnail={trailer.thumbnail}
                  url={trailer.url}
                  yt_id={trailer.yt_id}
                  views={trailer.views}
                  published={trailer.published}
                  genres={trailer.genres}
                />
              ))}
            </ScrollView>

            <View style={styles.pagination}>
              <TouchableOpacity
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Text style={styles.pageButton}>◀ Назад</Text>
              </TouchableOpacity>
              <Text style={styles.pageText}>Страница {page}</Text>
              <TouchableOpacity onPress={() => setPage((p) => p + 1)}>
                <Text style={styles.pageButton}>Вперед ▶</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingTop: SCREEN_HEIGHT * 0.02,
  },
  header: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.055,
    fontWeight: "bold",
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  errorText: {
    color: "#f88",
    fontSize: SCREEN_WIDTH * 0.04,
  },
  scroll: {
    width: "100%",
    maxWidth: 600,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SCREEN_HEIGHT * 0.1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 600,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    paddingBottom: SCREEN_HEIGHT * 0.01,
  },
  pageButton: {
    color: "#4fa3ff",
    fontSize: SCREEN_WIDTH * 0.04,
  },
  pageText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
  },
});
