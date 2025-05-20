import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { RiCollapseDiagonal2Line, RiExpandDiagonal2Line, RiResetRightLine } from '@remixicon/react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../theme/theme-context'
import { CssTransform } from '../theme/utils'
import {
  useEmbeddedChatbotContext,
} from '../context'
import Tooltip from '@/app/components/base/tooltip'
import ActionButton from '@/app/components/base/action-button'
import Divider from '@/app/components/base/divider'
import ViewFormDropdown from '@/app/components/base/chat/embedded-chatbot/inputs-form/view-form-dropdown'
import NuviLogo from '@/app/components/base/logo/nuvi-logo'
import cn from '@/utils/classnames'
import AppIcon from '@/app/components/base/app-icon'

export type IHeaderProps = {
  isMobile?: boolean
  allowResetChat?: boolean
  customerIcon?: React.ReactNode
  title: string
  theme?: Theme
  onCreateNewChat?: () => void
}
const Header: FC<IHeaderProps> = ({
  isMobile,
  allowResetChat,
  customerIcon,
  title,
  theme,
  onCreateNewChat,
}) => {
  const { t } = useTranslation()
  const {
    appData,
    currentConversationId,
    inputsForms,
  } = useEmbeddedChatbotContext()

  const isClient = typeof window !== 'undefined'
  const isIframe = isClient ? window.self !== window.top : false
  const [parentOrigin, setParentOrigin] = useState('')
  const [showToggleExpandButton, setShowToggleExpandButton] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleMessageReceived = useCallback((event: MessageEvent) => {
    let currentParentOrigin = parentOrigin
    if (!currentParentOrigin && event.data.type === 'dify-chatbot-config') {
      currentParentOrigin = event.origin
      setParentOrigin(event.origin)
    }
    if (event.origin !== currentParentOrigin)
      return
    if (event.data.type === 'dify-chatbot-config')
      setShowToggleExpandButton(event.data.payload.isToggledByButton && !event.data.payload.isDraggable)
  }, [parentOrigin])

  useEffect(() => {
    if (!isIframe) return

    const listener = (event: MessageEvent) => handleMessageReceived(event)
    window.addEventListener('message', listener)

    window.parent.postMessage({ type: 'dify-chatbot-iframe-ready' }, '*')

    return () => window.removeEventListener('message', listener)
  }, [isIframe, handleMessageReceived])

  const handleToggleExpand = useCallback(() => {
    if (!isIframe || !showToggleExpandButton) return
    setExpanded(!expanded)
    window.parent.postMessage({
      type: 'dify-chatbot-expand-change',
    }, parentOrigin)
  }, [isIframe, parentOrigin, showToggleExpandButton, expanded])

  if (!isMobile) {
    return (
      <div className='flex h-14 shrink-0 items-center justify-between p-3'>
        {/* Left section - empty for balance */}
        <div className='w-[120px]' />

        {/* Center section */}
        <div className='absolute left-1/2 flex -translate-x-1/2 items-center gap-1'>
          <div className='mr-4 shrink-0'>
            <AppIcon
              size='large'
              iconType={appData?.site.icon_type}
              icon={appData?.site.icon}
              background={appData?.site.icon_background}
              imageUrl={appData?.site.icon_url}
            />
          </div>
          <div className={cn('system-lg-regular truncate text-text-secondary')}>{appData?.site.title}</div>

          <Divider type='vertical' className='h-3.5' />

          {/* powered by */}
          <div className='shrink-0'>
            {!appData?.custom_config?.remove_webapp_brand && (
              <div className={cn(
                'flex shrink-0 items-center gap-1.5',
              )}>
                <div className='system-xs-regular uppercase text-text-tertiary'>{t('share.chat.poweredBy')}</div>
                {appData?.custom_config?.replace_webapp_logo && (
                  <img src={appData?.custom_config?.replace_webapp_logo} alt='logo' className='block h-5 w-auto' />
                )}
                {!appData?.custom_config?.replace_webapp_logo && (
                  <NuviLogo size='small' />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className='flex items-center gap-1'>
          {
            showToggleExpandButton && (
              <Tooltip
                popupContent={expanded ? t('share.chat.collapse') : t('share.chat.expand')}
              >
                <ActionButton size='l' onClick={handleToggleExpand}>
                  {
                    expanded
                      ? <RiCollapseDiagonal2Line className='h-[18px] w-[18px]' />
                      : <RiExpandDiagonal2Line className='h-[18px] w-[18px]' />
                  }
                </ActionButton>
              </Tooltip>
            )
          }
          {currentConversationId && allowResetChat && (
            <Tooltip
              popupContent={t('share.chat.resetChat')}
            >
              <ActionButton size='l' onClick={onCreateNewChat}>
                <RiResetRightLine className='h-[18px] w-[18px]' />
              </ActionButton>
            </Tooltip>
          )}
          {currentConversationId && inputsForms.length > 0 && (
            <ViewFormDropdown />
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('flex h-14 shrink-0 items-center justify-between px-3')}
      // style={Object.assign({}, CssTransform(theme?.backgroundHeaderColorStyle ?? ''), CssTransform(theme?.headerBorderBottomStyle ?? ''))}
    >
      <div className="flex grow items-center space-x-3">
        {customerIcon}
        <div
          className='system-md-semibold truncate'
          style={CssTransform(theme?.colorFontOnHeaderStyle ?? '')}
        >
          {title}
        </div>
      </div>
      <div className='flex items-center gap-1'>
        {
          showToggleExpandButton && (
            <Tooltip
              popupContent={expanded ? t('share.chat.collapse') : t('share.chat.expand')}
            >
              <ActionButton size='l' onClick={handleToggleExpand}>
                {
                  expanded
                    ? <RiCollapseDiagonal2Line className={cn('h-[18px] w-[18px]', theme?.colorPathOnHeader)} />
                    : <RiExpandDiagonal2Line className={cn('h-[18px] w-[18px]', theme?.colorPathOnHeader)} />
                }
              </ActionButton>
            </Tooltip>
          )
        }
        {currentConversationId && allowResetChat && (
          <Tooltip
            popupContent={t('share.chat.resetChat')}
          >
            <ActionButton size='l' onClick={onCreateNewChat}>
              <RiResetRightLine className={cn('h-[18px] w-[18px]', theme?.colorPathOnHeader)} />
            </ActionButton>
          </Tooltip>
        )}
        {currentConversationId && inputsForms.length > 0 && (
          <ViewFormDropdown iconColor={theme?.colorPathOnHeader} />
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
