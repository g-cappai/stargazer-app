import { useStargazers } from "@/api/useStargazers";
import { SearchForm } from "@/components/SearchForm";
import {
  ErrorStatus,
  IdleStatus,
  LoadingStatus,
  SearchStatusIndicator,
} from "@/components/SearchStatus";
import { SearchStatus } from "@/components/SearchStatus/SearchStatusIndicator";
import { StargazerList } from "@/components/StargazerList";
import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const [searchData, setSearchData] = useState({ owner: "", repo: "" });

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isFetching,
    isPending,
    isSuccess,
  } = useStargazers({ owner: searchData.owner, repo: searchData.repo });

  /**
   * Get the status of the search based on useStargazers state.
   * (Success case is handled by StargzerList.)
   *
   * @returns {SearchStatus} - The status of the search.
   */

  const getSearchStatus = (): SearchStatus | null => {
    if (isFetching) {
      return SearchStatus.LOADING;
    }

    if (isPending) {
      return SearchStatus.IDLE;
    }

    if (isError) {
      return SearchStatus.ERROR;
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchForm onSubmit={setSearchData} />
      {isSuccess ? (
        <StargazerList
          stargazers={data!.flat()}
          loadMore={fetchNextPage}
          isLoadingMore={isFetchingNextPage}
        />
      ) : (
        <SearchStatusIndicator
          status={getSearchStatus()}
          renderError={() => <ErrorStatus statusCode={error?.status} />}
          renderIdle={() => <IdleStatus />}
          renderLoading={() => <LoadingStatus />}
        />
      )}
    </View>
  );
}
