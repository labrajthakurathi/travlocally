import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { Link } from "react-router-dom";
import {
	InstantSearch,
	SearchBox,
	Hits,
	useInstantSearch,
} from "react-instantsearch-hooks-web";
import Hit from "./Hit";

const Search = () => {
	const searchClient = algoliasearch(
		"ZHTV4FUZ03",
		"bb5d13be06f5cb1c14b85b65f0c343c5"
	);
	const [showIcon, setShowIcon] = useState(true);
	return (
		<>
			<InstantSearch searchClient={searchClient} indexName='places'>
				<SearchBox placeholder='Enter the city or country...' />
				<EmptyQueryBoundary fallback={null}>
					<NoResultsBoundary fallback={<NoResults />}>
						<Hits hitComponent={Hit} />
					</NoResultsBoundary>
				</EmptyQueryBoundary>
			</InstantSearch>
			{showIcon && <i className='fas fa-search-location custom-search-btn'></i>}
		</>
	);
};

export default Search;

function NoResultsBoundary({ children, fallback }) {
	const { results } = useInstantSearch();

	// The `__isArtificial` flag makes sure to not display the No Results message
	// when no hits have been returned yet.
	if (!results.__isArtificial && results.nbHits === 0) {
		return (
			<>
				{fallback}
				<div hidden>{children}</div>
			</>
		);
	}

	return children;
}

function NoResults() {
	const { indexUiState } = useInstantSearch();

	return (
		<div className='search-no-result'>
			<p>
				No results for <q>{indexUiState.query}</q>.
			</p>
			<Link
				to='/add-places'
				className='btn-secondary'
				style={{ textDecoration: "none" }}
			>
				Add Place Instead?
			</Link>
		</div>
	);
}

function EmptyQueryBoundary({ children, fallback }) {
	const { indexUiState } = useInstantSearch();

	if (!indexUiState.query) {
		return fallback;
	}

	return children;
}
