const BASE_URL = "http://192.168.0.2:8000/api/";

interface IProps {
  url: string;
  header?: HeadersInit;
  type?: "POST" | "DELETE";
  body?: any;
  setter?: (data: any) => void;
  loading?: (isLoading: boolean) => void;
}

export async function get(props: IProps) {
  try {
    props.loading?.(true);

    const response = await fetch(BASE_URL + props.url, {
      method: "GET",
      headers: props.header,
    });

    const result = await response.json();
    props.setter?.(result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  } finally {
    props.loading?.(false);
  }
}

export async function post(props: IProps) {
  try {
    props.loading?.(true);

    const response = await fetch(BASE_URL + props.url, {
      method: props.type || "POST",
      body: JSON.stringify(props.body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...props.header,
      },
    });

    const result = await response.json();
    props.setter?.(result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  } finally {
    props.loading?.(false);
  }
}
