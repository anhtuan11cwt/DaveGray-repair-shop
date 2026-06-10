type ActionResult = {
  data?: { message?: string };
  serverError?: string;
  validationErrors?: Record<string, string[] | undefined>;
};

type Props = {
  result: ActionResult | undefined;
};

// Hiển thị kết quả trả về từ server action (thành công/lỗi validation/lỗi server)
function MessageBox({
  type,
  content,
}: {
  type: "success" | "error";
  content: string;
}) {
  const emoji = type === "success" ? "🎉" : "🚨";

  return (
    <div
      className={`p-2 rounded-xl font-bold text-sm text-center border ${
        type === "success"
          ? "bg-accent border-green-400 text-green-700"
          : "bg-destructive/20 border-destructive text-destructive"
      }`}
    >
      {emoji} {content}
    </div>
  );
}

export default function DisplayServerActionResponse({ result }: Props) {
  if (!result) return null;

  const { data, serverError, validationErrors } = result;

  if (data?.message) {
    return <MessageBox type="success" content={data.message as string} />;
  }

  if (serverError) {
    return <MessageBox type="error" content={serverError} />;
  }

  if (validationErrors) {
    const errors = Object.keys(validationErrors).map((key) => {
      const fieldErrors =
        validationErrors[key as keyof typeof validationErrors];
      if (Array.isArray(fieldErrors)) {
        return fieldErrors.map((msg: string) => (
          <p key={`${key}-${msg}`} className="text-destructive text-sm">
            {msg}
          </p>
        ));
      }
      return null;
    });

    return (
      <div className="p-2 rounded-xl bg-destructive/20 border border-destructive">
        {errors}
      </div>
    );
  }

  return null;
}
