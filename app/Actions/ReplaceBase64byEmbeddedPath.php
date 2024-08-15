<?php

namespace App\Actions;

class ReplaceBase64byEmbeddedPath
{
    private $html;
    private $pathsToImages;

    public function __construct($html, array $pathsToImages)
    {
        $this->html = $html;
        $this->pathsToImages = $pathsToImages;
    }

    public function replaceImages()
    {
        $pattern = '/data:image\/[a-zA-Z]+;base64,[^\"]+/';
        preg_match_all($pattern, $this->html, $matches);

        foreach ($matches[0] as $index => $base64Image) {
            if (isset($this->pathsToImages[$index])) {
                $embeddedPath = "{{ \$message->embed('{$this->pathsToImages[$index]}') }}";
                $this->html = str_replace($base64Image, $embeddedPath, $this->html);
            }
        }

        return $this->html;
    }
}