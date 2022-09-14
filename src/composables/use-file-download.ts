import { ref } from "vue";
import { type AxiosResponse } from "axios";

interface FileDownloadOptions {
  readonly apiDefinition: () => Promise<AxiosResponse<Blob>>;
  readonly preDownloading: () => void;
  readonly postDownloading: () => void;
  readonly onError: () => void;
  readonly getFileName: () => string;
}

export const useFileDownload = ({
  apiDefinition,
  preDownloading,
  postDownloading,
  onError,
  getFileName,
}: FileDownloadOptions) => {
  const refAnchorElement = ref<HTMLAnchorElement | null>(null);
  const download = async () => {
    try {
      preDownloading();
      const { data } = await apiDefinition();
      const url = URL.createObjectURL(new Blob([data]));
      refAnchorElement.value?.setAttribute("href", url);
      refAnchorElement.value?.setAttribute("download", getFileName());
      refAnchorElement.value?.click();
      postDownloading();
      URL.revokeObjectURL(url);
    } catch (error) {
      postDownloading();
      onError();
    }
  };

  return {
    download,
    refAnchorElement,
  };
};
