const API_BASE_URL = "http://localhost:5000/api";

export interface GenerateMusicParams {
  mood: string;
  duration: number;
}

export const generateMusic = async ({ mood, duration }: GenerateMusicParams): Promise<Blob> => {
  const response = await fetch(
    `${API_BASE_URL}/generate_music?mood=${encodeURIComponent(mood)}&duration=${duration}`,
    {
      method: "GET",
      headers: {
        "Accept": "audio/wav",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to generate music: ${response.statusText}`);
  }

  return await response.blob();
};
