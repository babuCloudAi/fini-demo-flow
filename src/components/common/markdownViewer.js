'use client';
import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import {MARKDOWN_SLOW_REVEAL_INTERVAL} from '@/config/constants';

export function MarkdownViewer({markdownContent, isSlowReveal = false}) {
    const [mdxContent, setMdxContent] = useState(null);
    const [displayedText, setDisplayedText] = useState('');

    /**
     * Handle slow reveal of markdown content
     */
    useEffect(() => {
        setDisplayedText(''); // Reset on new content

        if (isSlowReveal) {
            let index = 0;
            const interval = setInterval(() => {
                if (index >= markdownContent.length) {
                    setDisplayedText(markdownContent);
                    clearInterval(interval);
                } else {
                    setDisplayedText(markdownContent.substring(0, index));

                    index += MARKDOWN_SLOW_REVEAL_INTERVAL; // Adjust reveal speed
                }
            }, 50);
            return () => clearInterval(interval);
        } else {
            setDisplayedText(markdownContent);
        }
    }, [markdownContent, isSlowReveal]);

    /**
     * Convert progressively revealed markdown to MDX
     */
    useEffect(() => {
        async function serializeMarkdown() {
            if (!displayedText) return;

            try {
                const serializedContent = await serialize(displayedText, {
                    mdxOptions: {remarkPlugins: [remarkGfm]}
                });
                setMdxContent(serializedContent);
            } catch (error) {
                console.error('Error serializing MDX:', error);
            }
        }
        serializeMarkdown();
    }, [displayedText]);

    return (
        <Box>
            {mdxContent ? (
                <MDXRemote {...mdxContent} />
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Box>
    );
}
