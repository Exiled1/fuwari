<script lang="ts">
import { onMount } from "svelte";
import I18nKey from "../../i18n/i18nKey";
import { i18n } from "../../i18n/translation";
import { url } from "../../utils/url-utils";

export let tags: Array<{ name: string; count: number }> = [];

let selectedTags: string[] = [];
let isCollapsed = true;

const COLLAPSED_HEIGHT = "7.5rem";

onMount(() => {
	// Read current selected tags from URL
	const params = new URLSearchParams(window.location.search);
	selectedTags = params.getAll("tag");

	// Auto-expand if many tags are selected
	if (selectedTags.length > 3) {
		isCollapsed = false;
	}
});

function toggleTag(tagName: string) {
	const trimmedTag = tagName.trim();
	const isSelected = selectedTags.includes(trimmedTag);

	if (isSelected) {
		selectedTags = selectedTags.filter((tag) => tag !== trimmedTag);
	} else {
		selectedTags = [...selectedTags, trimmedTag];
	}

	updateURL();
}

function clearAllTags() {
	selectedTags = [];
	updateURL();
}

function updateURL() {
	const params = new URLSearchParams(window.location.search);

	// Remove all existing tag parameters
	params.delete("tag");

	// Add selected tags
	for (const tag of selectedTags) {
		params.append("tag", tag);
	}

	// Update URL and reload archive
	const newUrl = url(`/archive/?${params.toString()}`);
	window.location.href = newUrl;
}

function toggleCollapse() {
	isCollapsed = !isCollapsed;
}

$: shouldShowCollapse = tags.length >= 20;
$: hasSelectedTags = selectedTags.length > 0;
</script>

<div class="card-base p-4">
	<div class="flex items-center justify-between mb-3">
		<h3 class="text-lg font-bold">{i18n(I18nKey.tags)}</h3>
		<div class="flex gap-2">
			{#if hasSelectedTags}
				<button 
					on:click={clearAllTags}
					class="text-xs text-50 hover:text-75 transition-colors"
					aria-label="Clear all selected tags"
				>
					Clear All
				</button>
			{/if}
			{#if shouldShowCollapse}
				<button 
					on:click={toggleCollapse}
					class="text-xs text-50 hover:text-75 transition-colors"
					aria-label={isCollapsed ? "Expand tag list" : "Collapse tag list"}
				>
					{isCollapsed ? "Show All" : "Show Less"}
				</button>
			{/if}
		</div>
	</div>
	
	<div 
		class="flex gap-2 flex-wrap overflow-hidden transition-all duration-300"
		style={isCollapsed && shouldShowCollapse ? `max-height: ${COLLAPSED_HEIGHT}` : ""}
	>
		{#each tags as tag}
			<button
				on:click={() => toggleTag(tag.name)}
				class="btn-regular h-8 text-sm px-3 rounded-lg transition-all
					{selectedTags.includes(tag.name.trim()) 
						? 'bg-[var(--primary)] text-[var(--card-bg)] shadow-md' 
						: 'hover:bg-[var(--btn-regular-bg-hover)]'}"
				aria-label={`${selectedTags.includes(tag.name.trim()) ? 'Remove' : 'Add'} ${tag.name.trim()} tag filter`}
			>
				{#if selectedTags.includes(tag.name.trim())}
					<div class="h-1 w-1 bg-current rounded-md mr-2"></div>
				{/if}
				{tag.name.trim()}
				<span class="ml-1 text-xs opacity-75">({tag.count})</span>
			</button>
		{/each}
	</div>
</div>