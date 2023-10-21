import CategoryList from "@/components/common/CategoryList";
import Menu from "@/components/common/Menu";
import PostList from "@/components/home/PostList";

export default function Home({ searchParams }) {
    const page = searchParams.page || 1;
    // const category = searchParams.category || '';

    return (
        <main>
            <CategoryList />
            <div className="flex gap-2 w-full">
                <div className="w-full ">
                    <PostList page={page}  />
                </div>
                <div className="w-[35%] ">
                    <Menu />
                </div>
            </div>
        </main>
    );
}
