<?php

/**
 * @author     Branko Wilhelm <branko.wilhelm@gmail.com>
 * @link       http://www.z-index.net
 * @copyright  (c) 2013 - 2014 Branko Wilhelm
 * @license    GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */

defined('_JEXEC') or die;

class plgContentTwitch extends JPlugin
{
    private $size = array('huge', 'large', 'medium', 'small');

    public function onContentPrepare($context, &$row, &$params, $page = 0)
    {
        if (JString::strpos($row->text, '{twitch') === false) {
            return true;
        }

        preg_match_all('#{twitch\s+(.*?)\s?(huge|large|medium|small)?}#i', $row->text, $matches, PREG_SET_ORDER);

        if (!empty($matches)) {
            $doc = JFactory::getDocument();
            $doc->addScript('media/twitch/twitch.js');

            foreach ($matches as $match) {
                $size = (isset($match[2]) && in_array($match[2], $this->size)) ? $match[2] : $this->params->get('size', 'medium');

                $users[] = $match[1] = trim($match[1]);
                $replace = '<span class="twitch" id="twitch_' . $match[1] . '" data-size=' . $size . '>' . JHtml::_('link', 'http://www.twitch.tv/' . $match[1], $match[1], array('target' => '_blank')) . ' Offline</span>';
                $row->text = JString::str_ireplace($match[0], $replace, $row->text);
            }

            $doc->addScriptDeclaration('window.twitch.init("' . implode(',', $users) . '");');
        }
    }
}