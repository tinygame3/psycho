using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

[CustomEditor(typeof(HourseMgr))]
public class HourseEditor : Editor
{
    private SerializedProperty points;
    private void Awake()
    {
        
    }

    private void OnEnable()
    {
        points = serializedObject.FindProperty("points");
    }

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();
        EditorGUILayout.LabelField("    ");
        if (GUILayout.Button("Add Point"))
        {

        }
    }
}
