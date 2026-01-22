"use client";

export function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Delete this product?")) e.preventDefault();
      }}
      className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700
                 hover:bg-red-100 active:scale-[0.98] transition"
    >
      Delete
    </button>
  );
}
