import type { FC } from 'react'
import {
  memo,
  useRef,
} from 'react'
import { useHover } from 'ahooks'
import type { ConversationItem } from '@/models/share'
import { useThemeContext } from '@/app/components/base/chat/embedded-chatbot/theme/theme-context'
import { CssTransform } from '@/app/components/base/chat/embedded-chatbot/theme/utils'
import Operation from '@/app/components/base/chat/chat-with-history/sidebar/operation'
import cn from '@/utils/classnames'

type ItemProps = {
  isPin?: boolean
  item: ConversationItem
  onOperate: (type: string, item: ConversationItem) => void
  onChangeConversation: (conversationId: string) => void
  currentConversationId: string
}
const Item: FC<ItemProps> = ({
  isPin,
  item,
  onOperate,
  onChangeConversation,
  currentConversationId,
}) => {
  const ref = useRef(null)
  const isHovering = useHover(ref)
  const isSelected = currentConversationId === item.id
  const themeBuilder = useThemeContext()

  return (
    <div
      ref={ref}
      key={item.id}
      className={cn(
        'system-md-regular group flex cursor-pointer rounded-lg p-1 pl-3 text-components-menu-item-text hover:bg-state-base-hover',
        isSelected && 'bg-state-base-hover hover:bg-state-base-hover',
      )}
      style={isSelected ? CssTransform(themeBuilder?.theme?.textAccentClass || '') : {}}
      onClick={() => onChangeConversation(item.id)}
    >
      <div className='grow truncate p-1 pl-0' title={item.name}>{item.name}</div>
      {item.id !== '' && (
        <div className='flex shrink-0 items-center' onClick={e => e.stopPropagation()}>
          <Operation
            isActive={isSelected}
            isPinned={!!isPin}
            isItemHovering={isHovering}
            togglePin={() => onOperate(isPin ? 'unpin' : 'pin', item)}
            isShowDelete={false}
            isShowRenameConversation={false}
            onRenameConversation={() => onOperate('rename', item)}
            onDelete={() => onOperate('delete', item)}
          />
        </div>
      )}
    </div>
  )
}

export default memo(Item)
