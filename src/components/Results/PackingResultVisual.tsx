import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { PackResponse } from '@/app/types/paccurateTypes';

interface PackingResultVisualProps {
    result: PackResponse;
}

export const PackingResultVisual: React.FC<PackingResultVisualProps> = ({ result }) => {
    const addOutlineToSvg = (svg: string) => {

        const viewBoxMatch = svg.match(/viewBox=['"]([^'"]+)['"]/);
        const viewBox = viewBoxMatch ? viewBoxMatch[1] : '-28.53300858899106,-26.531036307982866,123.7436867076458,122.4744871391589';

        const fixedSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
            <g stroke="black" stroke-width="1" fill="none">
                ${svg.replace(/<figure[^>]*>|<\/figure>|<svg[^>]*>|<\/svg>|<figcaption[^>]*>|<\/figcaption>/g, '')}
            </g>
        </svg>
    `;

        return fixedSvg.trim();
    };
    return (
        <SimpleGrid columns={[1, 2]} spacing={4}>
            {result.svgs.map((svg, index) => (
                <Box
                    key={index}
                    width="140px"

                    borderRadius="md"

                    p={2}
                >
                    <Box
                        as="div"
                        w="160px"
                        dangerouslySetInnerHTML={{ __html: addOutlineToSvg(svg) }}
                    />
                </Box>
            ))}
        </SimpleGrid>
    );
};