import { useCallback, useState } from 'react'
import {
  RiChatNewLine,
  RiLayoutLeftLine,
} from '@remixicon/react'
import { useTranslation } from 'react-i18next'
import {
  useChatWithHistoryContext,
} from '../context'
import ActionButton from '@/app/components/base/action-button'
import AppIcon from '@/app/components/base/app-icon'
import Tooltip from '@/app/components/base/tooltip'
import ViewFormDropdown from '@/app/components/base/chat/chat-with-history/inputs-form/view-form-dropdown'
import Confirm from '@/app/components/base/confirm'
import RenameModal from '@/app/components/base/chat/chat-with-history/sidebar/rename-modal'
import type { ConversationItem } from '@/models/share'
import cn from '@/utils/classnames'

const Header = () => {
  const {
    appData,
    currentConversationId,
    currentConversationItem,
    inputsForms,
    pinnedConversationList,
    handlePinConversation,
    handleUnpinConversation,
    conversationRenaming,
    handleRenameConversation,
    handleDeleteConversation,
    handleNewConversation,
    sidebarCollapseState,
    handleSidebarCollapse,
    isResponding,
  } = useChatWithHistoryContext()
  const { t } = useTranslation()
  const isSidebarCollapsed = sidebarCollapseState

  const isPin = pinnedConversationList.some(item => item.id === currentConversationId)

  const [showConfirm, setShowConfirm] = useState<ConversationItem | null>(null)
  const [showRename, setShowRename] = useState<ConversationItem | null>(null)
  const handleOperate = useCallback((type: string) => {
    if (type === 'pin')
      handlePinConversation(currentConversationId)

    if (type === 'unpin')
      handleUnpinConversation(currentConversationId)

    if (type === 'delete')
      setShowConfirm(currentConversationItem as any)

    if (type === 'rename')
      setShowRename(currentConversationItem as any)
  }, [currentConversationId, currentConversationItem, handlePinConversation, handleUnpinConversation])
  const handleCancelConfirm = useCallback(() => {
    setShowConfirm(null)
  }, [])
  const handleDelete = useCallback(() => {
    if (showConfirm)
      handleDeleteConversation(showConfirm.id, { onSuccess: handleCancelConfirm })
  }, [showConfirm, handleDeleteConversation, handleCancelConfirm])
  const handleCancelRename = useCallback(() => {
    setShowRename(null)
  }, [])
  const handleRename = useCallback((newName: string) => {
    if (showRename)
      handleRenameConversation(showRename.id, newName, { onSuccess: handleCancelRename })
  }, [showRename, handleRenameConversation, handleCancelRename])

  return (
    <>
      <div className='flex h-14 shrink-0 items-center justify-between p-3'>
        <div className='flex items-center'>
          {isSidebarCollapsed && (
            <ActionButton className={cn('mr-4', !isSidebarCollapsed && 'cursor-default')} size='l' onClick={() => handleSidebarCollapse(false)}>
              <RiLayoutLeftLine className='h-[18px] w-[18px]' />
            </ActionButton>
          )}
        </div>
        <div className={cn('flex flex-1 items-center justify-center gap-1 transition-all duration-200 ease-in-out', !isSidebarCollapsed && 'user-select-none')}>
          <div className='flex items-center gap-1'>
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
          </div>

          {/* {currentConversationId && currentConversationItem && isSidebarCollapsed && (
            <>
              <div className='p-1 text-divider-deep'>/</div>
              <Operation
                title={currentConversationItem?.name || ''}
                isPinned={!!isPin}
                togglePin={() => handleOperate(isPin ? 'unpin' : 'pin')}
                isShowDelete
                isShowRenameConversation
                onRenameConversation={() => handleOperate('rename')}
                onDelete={() => handleOperate('delete')}
              />
            </>
          )} */}
          {/* <div className='flex items-center px-1'>
            <div className='h-[14px] w-px bg-divider-regular'></div>
          </div>
          {isSidebarCollapsed && (
            <Tooltip
              disabled={!!currentConversationId}
              popupContent={t('share.chat.newChatTip')}
            >
              <div>
                <ActionButton
                  size='l'
                  state={(!currentConversationId || isResponding) ? ActionButtonState.Disabled : ActionButtonState.Default}
                  disabled={!currentConversationId || isResponding}
                  onClick={handleNewConversation}
                >
                  <RiEditBoxLine className='h-[18px] w-[18px]' />
                </ActionButton>
              </div>
            </Tooltip>
          )} */}
        </div>
        <div className='flex items-center gap-1'>
          {currentConversationId && (
            <Tooltip
              popupContent={t('share.chat.resetChat')}
            >
              <ActionButton size='l' onClick={handleNewConversation}>
                <RiChatNewLine className='h-[18px] w-[18px]' />
              </ActionButton>
            </Tooltip>
          )}
          {currentConversationId && inputsForms.length > 0 && (
            <ViewFormDropdown />
          )}
        </div>
      </div>
      {!!showConfirm && (
        <Confirm
          title={t('share.chat.deleteConversation.title')}
          content={t('share.chat.deleteConversation.content') || ''}
          isShow
          onCancel={handleCancelConfirm}
          onConfirm={handleDelete}
        />
      )}
      {showRename && (
        <RenameModal
          isShow
          onClose={handleCancelRename}
          saveLoading={conversationRenaming}
          name={showRename?.name || ''}
          onSave={handleRename}
        />
      )}
    </>
  )
}

export default Header
