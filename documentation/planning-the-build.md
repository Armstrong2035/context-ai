## The idea

This idea came to my mind when I was in church. The preacher had quoted a scripture I really liked, and I wondered, sadly, if I would ever remember it after now, or if I would even revisit the notes. I realized that while I have a huge amount of information around me, I can't always use all that information when I need it simply because I may not remember it all. I may even bookmark it, but will I be able to find it? I certainly never revisit my bookmarks.

There arose the idea of building some sort of product that automatically indexed everything my notes according to content / relevance - and automatically sort them into folders that make it easy to find all notes according to need. For example, notes on wisdom will enter a folder called wisdom. Notes on marital wisdom, financial wisdom, social wisdom may fall into the same wisdom category, but into their own sub categories. As I add more notes to the folders, the directory becomes more attuned to the unique knowledge I am getting everyday. Bascially, my network of notes indexed according to relevance and topic.

I am building the first iteration of this idea as a google chrome extension. This should eventually work with video, images and every kind of media format. But for now we will focus on text. This would be useful for knowledge workers, and academic at all levels - people who contantly need knowledge to improve at work, see all kinds of knowledge on the itnernet, but never remember to go back to those things. I want to give such people an AI powered bookmarks that organizes itself according to relevance and content.

## How I will build version 1

- Step 1: Create the manifest.json for the extension
- Step 2: Write the content script that reads the screen content and saves it
- Step 3: Write the background script that summarizes the content from step 2.
- Step 4: Write the background script that takes the summary from step 3, and evaluates it against the existing folder / sub-folder structure. The point of this is to find the most relevant folder to sort the page into.
  Step 5: Write the background script which based on the result of step 4 does one of the follwing: - Create a new folder - Create a new sub folder - Save the page inside the folder / sub folder. - Connect the page to other content (maybe version 2?)

## Step 1:
