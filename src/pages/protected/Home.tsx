import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { increment, decrement } from "@/store/counterSlice";

export default function Home() {
  const { t, i18n } = useTranslation();
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>

      <div className="mt-4 space-x-4">
        <button
          type="button"
          onClick={() => i18n.changeLanguage("zhCN")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          中文
        </button>
        <button
          type="button"
          onClick={() => i18n.changeLanguage("en")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          English
        </button>
      </div>
      <div className="p-6">
        <h1 className="text-xl font-bold">Count: {count}</h1>
        <div className="space-x-4 mt-4">
          <button type="button" onClick={() => dispatch(increment())}>
            +
          </button>
          <button type="button" onClick={() => dispatch(decrement())}>
            -
          </button>
        </div>
      </div>
    </div>
  );
}
