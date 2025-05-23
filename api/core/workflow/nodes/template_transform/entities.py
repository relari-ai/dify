from core.workflow.entities.variable_entities import VariableSelector
from core.workflow.nodes.base import BaseNodeData


class TemplateTransformNodeData(BaseNodeData):
    """
    Template Transform Node Data.
    """

    variables: list[VariableSelector]
    template: str
